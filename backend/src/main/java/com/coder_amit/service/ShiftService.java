package com.coder_amit.service;

import com.coder_amit.model.Section;
import com.coder_amit.model.Shift;
import com.coder_amit.model.Seat;
import com.coder_amit.repository.SectionRepository;
import com.coder_amit.repository.ShiftRepository;
import com.coder_amit.repository.SeatRepository;
import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;

@Service
public class ShiftService {
    private final ShiftRepository shiftRepository;
    private final SectionRepository sectionRepository;
    private final SeatRepository seatRepository;

    public ShiftService(ShiftRepository shiftRepository,
            SectionRepository sectionRepository,
            SeatRepository seatRepository) {
        this.shiftRepository = shiftRepository;
        this.sectionRepository = sectionRepository;
        this.seatRepository = seatRepository;
    }

    public List<Shift> getShiftsBySectionId(Long sectionId) {

        java.time.LocalDate today = java.time.LocalDate.now();

        List<Shift> shifts = shiftRepository.findBySectionId(sectionId);

        for (Shift shift : shifts) {

            if (shift.getExpiryDate() != null &&
                    shift.getExpiryDate().isBefore(today)) {

                List<Seat> seats = seatRepository.findAll()
                        .stream()
                        .filter(seat -> seat.getShift() != null &&
                                seat.getShift().getId().equals(shift.getId()))
                        .toList();

                for (Seat seat : seats) {
                    seat.setStatus("AVAILABLE");
                }

                seatRepository.saveAll(seats);
            }
        }

        return shifts.stream()
                .filter(shift -> shift.getExpiryDate() != null &&
                        !shift.getExpiryDate().isBefore(today))
                .toList();
    }

    public Shift createShift(Shift shift, Long sectionId) {
        Section section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));
        shift.setSection(section);
        shift.setCoinLimitUsage(shift.getCoinLimitUsage());

        // Calculate price based on discount type
        if ("PERCENTAGE".equalsIgnoreCase(shift.getDiscountType())) {
            shift.setPrice(shift.getMrp() - (shift.getMrp() * shift.getDiscountValue() / 100));
        } else {
            shift.setPrice(shift.getMrp() - shift.getDiscountValue());
        }

        // Auto 31 Days Logic
        java.time.LocalDate today = java.time.LocalDate.now();

        shift.setStartDate(today);
        shift.setExpiryDate(today.plusDays(30)); // 30 visible days
        shift.setDurationDays(31); // DB level duration

        Shift savedShift = shiftRepository.save(shift);

        // Auto generate seats
        List<Seat> seats = new ArrayList<>();

        for (int i = section.getStartSeatNumber(); i <= section.getEndSeatNumber(); i++) {
            Seat seat = new Seat();
            seat.setSeatNumber(i);
            seat.setStatus("AVAILABLE");
            seat.setShift(savedShift);
            seats.add(seat);
        }

        seatRepository.saveAll(seats);

        return savedShift;
    }

    public List<Shift> getAllShifts() {

        return shiftRepository.findAll()
                .stream()
                .filter(shift -> shift.getSection() != null
                        && shift.getSection().getCentre() != null
                        && shift.getSection().getCentre().getZone() != null
                        && !shift.getSection().getCentre().getZone().getDeleted())
                .toList();
    }

    public Shift getShiftById(Long id) {
        return shiftRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shift not found"));
    }

    public Shift updateShift(Long id, Shift shiftDetails, Long sectionId) {
        Shift shift = getShiftById(id);
        Section section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));

        shift.setName(shiftDetails.getName());
        shift.setStartTime(shiftDetails.getStartTime());
        shift.setEndTime(shiftDetails.getEndTime());
        shift.setMrp(shiftDetails.getMrp());
        shift.setDiscountValue(shiftDetails.getDiscountValue());
        shift.setDiscountType(shiftDetails.getDiscountType());

        if ("PERCENTAGE".equalsIgnoreCase(shift.getDiscountType())) {
            shift.setPrice(shift.getMrp() - (shift.getMrp() * shift.getDiscountValue() / 100));
        } else {
            shift.setPrice(shift.getMrp() - shift.getDiscountValue());
        }

        shift.setStartDate(shiftDetails.getStartDate());
        shift.setExpiryDate(shiftDetails.getExpiryDate());
        shift.setDurationDays(shiftDetails.getDurationDays());
        shift.setInterval(shiftDetails.getInterval());
        shift.setCoinLimitUsage(shiftDetails.getCoinLimitUsage());
        shift.setCoinLimitType(shiftDetails.getCoinLimitType());

        shift.setDiscount90Days(shiftDetails.getDiscount90Days());
        shift.setDiscount180Days(shiftDetails.getDiscount180Days());
        shift.setDiscount270Days(shiftDetails.getDiscount270Days());
        shift.setDiscount360Days(shiftDetails.getDiscount360Days());

        shift.setSection(section);

        return shiftRepository.save(shift);
    }

    public void deleteShift(Long id) {
        shiftRepository.deleteById(id);
    }

    public Shift blockShift(Long id) {

        Shift shift = shiftRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Shift not found"));

        if (shift.getActive() == null) {
            shift.setActive(true);
        }

        shift.setActive(!shift.getActive());

        return shiftRepository.save(shift);
    }
}