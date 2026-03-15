package com.coder_amit.controller;

import com.coder_amit.model.Booking;
import com.coder_amit.repository.BookingRepository;
import java.util.Map;
import com.coder_amit.model.Shift;
import com.coder_amit.repository.ShiftRepository;
import com.coder_amit.model.User;
import com.coder_amit.repository.UserRepository;
import com.coder_amit.model.Seat;
import com.coder_amit.repository.SeatRepository;
import com.coder_amit.service.SeatService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/seats")
@CrossOrigin
public class SeatController {

    private final SeatRepository seatRepository;
    private final SeatService seatService;
    private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final ShiftRepository shiftRepository;

    public SeatController(SeatRepository seatRepository,
            SeatService seatService,
            BookingRepository bookingRepository,
            UserRepository userRepository,
            ShiftRepository shiftRepository) {

        this.seatRepository = seatRepository;
        this.seatService = seatService;
        this.bookingRepository = bookingRepository;
        this.userRepository = userRepository;
        this.shiftRepository = shiftRepository;
    }

    @GetMapping("/{shiftId}")
    public List<Seat> getSeatsByShift(@PathVariable Long shiftId) {
        return seatRepository.findByShiftIdOrderBySeatNumberAsc(shiftId);
    }

    @GetMapping("/section/{sectionId}")
    public List<Seat> getSeatsBySection(@PathVariable Long sectionId) {
        return seatRepository.findByShift_Section_IdOrderBySeatNumberAsc(sectionId);
    }

    @PostMapping("/book/{seatId}")
    public Seat bookSeat(@PathVariable Long seatId) {
        return seatService.bookSeat(seatId);
    }

    @PostMapping("/manual-book")
    public Seat manualBookSeat(@RequestBody Map<String, Object> data) {

        Long seatId = Long.valueOf(data.get("seatId").toString());
        Long studentId = Long.valueOf(data.get("studentId").toString());
        Long vendorId = Long.valueOf(data.get("vendorId").toString());

        Seat seat = seatRepository.findById(seatId).orElseThrow();

        seat.setStatus("BOOKED");
        seatRepository.save(seat);

        Long shiftId = Long.valueOf(data.get("shiftId").toString());

        Shift shift = shiftRepository.findById(shiftId).orElseThrow();

        Booking booking = new Booking();

        booking.setSeat(seat);
        booking.setStudentId(studentId);
        booking.setShift(shift);

        booking.setAmount(shift.getPrice());

        // vendor fetch
        User vendor = userRepository.findById(vendorId)
                .orElseThrow(() -> new RuntimeException("Vendor not found"));

        Double commissionPercent = vendor.getCommission();

        Double commissionAmount = shift.getPrice() * commissionPercent / 100;

        booking.setCommission(commissionAmount);

        booking.setVendorPayable(shift.getPrice() - commissionAmount);

        booking.setBookingTime(java.time.LocalDateTime.now());

        bookingRepository.save(booking);

        return seat;
    }
}