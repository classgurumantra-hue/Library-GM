package com.coder_amit.repository;

import com.coder_amit.model.Section;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SectionRepository extends JpaRepository<Section, Long> {

    List<Section> findByCentreId(Long centreId);

}