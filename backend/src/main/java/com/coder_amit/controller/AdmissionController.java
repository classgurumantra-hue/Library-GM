package com.coder_amit.controller;

import com.coder_amit.model.Admission;
import com.coder_amit.service.AdmissionService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admissions")
public class AdmissionController {
    private final AdmissionService admissionService;

    public AdmissionController(AdmissionService admissionService) {
        this.admissionService = admissionService;
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','SUB_ADMIN','CO_ADMIN','VENDOR')")
    public Admission addAdmission(@RequestBody Admission admission) {
        return admissionService.addAdmission(admission);
    }

    @GetMapping("/centre/{centreId}")
    @PreAuthorize("hasAnyRole('ADMIN','SUB_ADMIN','CO_ADMIN')")
    public List<Admission> getAdmissionsByCentre(@PathVariable Long centreId) {
        return admissionService.getAdmissionsByCentre(centreId);
    }
}