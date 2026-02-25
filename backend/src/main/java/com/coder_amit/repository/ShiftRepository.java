package com.coder_amit.repository;

import com.coder_amit.model.Shift;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ShiftRepository extends JpaRepository<Shift,Long> {
}
