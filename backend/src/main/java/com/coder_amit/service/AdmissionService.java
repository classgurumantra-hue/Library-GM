package com.coder_amit.service;

import com.coder_amit.model.Admission;
import com.coder_amit.repository.AdmissionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdmissionService {
    private final AdmissionRepository admissionRepository;

    public AdmissionService(AdmissionRepository admissionRepository) {
        this.admissionRepository = admissionRepository;
    }

    public Admission addAdmission(Admission admission) {
        return admissionRepository.save(admission);
    }

    public List<Admission> getAdmissionsByCentre(Long centreId) {
        return admissionRepository.findByCentre_Id(centreId);
    }
}