package com.coder_amit.repository;
import com.coder_amit.model.Admission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AdmissionRepository extends JpaRepository<Admission,Long> {
        List<Admission> findByCentre_Id(Long centreId);
}
