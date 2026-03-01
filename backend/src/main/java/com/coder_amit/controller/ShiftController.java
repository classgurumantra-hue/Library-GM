package com.coder_amit.controller;
import com.coder_amit.model.Shift;
import com.coder_amit.service.ShiftService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/shifts")
public class ShiftController {
    private final ShiftService shiftService;

    public ShiftController(ShiftService shiftService) {
        this.shiftService = shiftService;
    }

    @GetMapping("/section/{sectionId}")
public List<Shift> getShiftsBySectionId(@PathVariable Long sectionId) {
    return shiftService.getShiftsBySectionId(sectionId);
}

    @PostMapping("/{sectionId}")
    public Shift createShift(@RequestBody Shift shift, @PathVariable Long sectionId) {
        return shiftService.createShift(shift, sectionId);
    }

    @GetMapping
    public List<Shift> getAllShifts() {
        return shiftService.getAllShifts();
    }

    @GetMapping("/{id}")
    public Shift getShiftById(@PathVariable Long id) {
        return shiftService.getShiftById(id);
    }

    @PutMapping("/{id}/{sectionId}")
    public Shift updateShift(@PathVariable Long id, @RequestBody Shift shiftDetails, @PathVariable Long sectionId) {
        return shiftService.updateShift(id, shiftDetails, sectionId);
    }

    @DeleteMapping("/{id}")
    public void deleteShift(@PathVariable Long id) {
        shiftService.deleteShift(id);
    }
}
