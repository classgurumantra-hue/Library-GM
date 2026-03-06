package com.coder_amit.repository;

import java.util.List;
import com.coder_amit.model.Shift;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShiftRepository extends JpaRepository<Shift, Long> {

    List<Shift> findBySectionId(Long sectionId);

    void deleteBySectionId(Long sectionId);
}
