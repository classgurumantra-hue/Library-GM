package com.coder_amit.controller;

import com.coder_amit.model.Admission;
import com.coder_amit.service.AdmissionService;
import org.springframework.web.bind.annotation.*;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;

import java.util.List;

@RestController
@RequestMapping("/api/admissions")
public class AdmissionController {

    private final AdmissionService admissionService;

    public AdmissionController(AdmissionService admissionService) {
        this.admissionService = admissionService;
    }

    // ✅ Add Admission
    @PostMapping
    public Admission addAdmission(@RequestBody Admission admission) {
        return admissionService.addAdmission(admission);
    }

    // ✅ Get Admissions By Centre
    @GetMapping("/centre/{centreId}")
    public List<Admission> getAdmissionsByCentre(@PathVariable Long centreId) {
        return admissionService.getAdmissionsByCentre(centreId);
    }

    @PostMapping("/accept")
    public String acceptAdmission(@RequestParam String email) {

        System.out.println("Admission accepted for: " + email);

        return "Admission accepted successfully";
    }

    // ✅ Vendor creates admission request
    @PostMapping("/vendor")
    public Admission createVendorAdmission(
            @RequestParam Long studentId,
            @RequestParam Long vendorId,
            @RequestParam Long centreId,
            @RequestParam Long sectionId,
            @RequestParam Long shiftId,
            @RequestParam Long seatId,
            @RequestParam String studentName) {

        return admissionService.createVendorAdmission(
                studentId,
                vendorId,
                centreId,
                sectionId,
                shiftId,
                seatId,
                studentName);
    }

    // ✅ Student verifies admission from email
    @GetMapping("/verify")
    public String verifyAdmission(@RequestParam String token) {

        Admission admission = admissionService.verifyAdmissionToken(token);

        return "Admission verified successfully for student: "
                + admission.getStudent().getEmail();
    }
}