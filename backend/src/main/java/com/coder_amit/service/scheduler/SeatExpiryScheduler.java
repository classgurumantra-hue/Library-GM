package com.coder_amit.service.scheduler;

import com.coder_amit.model.Booking;
import com.coder_amit.model.Seat;
import com.coder_amit.repository.BookingRepository;
import com.coder_amit.repository.SeatRepository;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class SeatExpiryScheduler {

    private final BookingRepository bookingRepository;
    private final SeatRepository seatRepository;

    public SeatExpiryScheduler(BookingRepository bookingRepository,
            SeatRepository seatRepository) {
        this.bookingRepository = bookingRepository;
        this.seatRepository = seatRepository;
    }

    @Scheduled(cron = "0 0 2 * * ?")
    public void expireOldBookings() {

        LocalDateTime expiryTime = LocalDateTime.now().minusDays(30);

        List<Booking> expiredBookings = bookingRepository.findByBookingTimeBefore(expiryTime);

        for (Booking booking : expiredBookings) {

            Seat seat = booking.getSeat();

            if ("BOOKED".equalsIgnoreCase(seat.getStatus())) {

                seat.setStatus("AVAILABLE");
                seatRepository.save(seat);
            }
        }

        System.out.println("Expired seats released: " + expiredBookings.size());
    }

    @Scheduled(fixedRate = 60000)
    public void releaseHeldSeats() {

        List<Seat> seats = seatRepository.findAll();

        for (Seat seat : seats) {

            if ("HOLD".equalsIgnoreCase(seat.getStatus()) && seat.getLockTime() != null) {

                LocalDateTime expiryTime = seat.getLockTime().plusMinutes(5);

                if (LocalDateTime.now().isAfter(expiryTime)) {

                    seat.setStatus("AVAILABLE");
                    seat.setLockTime(null);

                    seatRepository.save(seat);
                }
            }
        }
    }
}