package com.coder_amit.service;

import com.coder_amit.model.Section;
import com.coder_amit.model.Shift;
import com.coder_amit.repository.SectionRepository;
import com.coder_amit.repository.ShiftRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ShiftService {
    private final ShiftRepository shiftRepository;
    private final SectionRepository sectionRepository;

    public ShiftService(ShiftRepository shiftRepository, SectionRepository sectionRepository) {
        this.shiftRepository = shiftRepository;
        this.sectionRepository = sectionRepository;
    }

    public Shift createShift(Shift shift, Long sectionId) {
        Section section = sectionRepository.findById(sectionId)
                .orElseThrow(() -> new RuntimeException("Section not found"));
        shift.setSection(section);

        // Calculate price based on discount type
        if ("PERCENTAGE".equalsIgnoreCase(shift.getDiscountType())) {
            shift.setPrice(shift.getMrp() - (shift.getMrp() * shift.getDiscountValue() / 100));
        } else {
            shift.setPrice(shift.getMrp() - shift.getDiscountValue());
        }

        return shiftRepository.save(shift);
    }

    public List<Shift> getAllShifts() {
        return shiftRepository.findAll();
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
}