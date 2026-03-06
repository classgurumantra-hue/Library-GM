package com.coder_amit.service;

import com.coder_amit.model.Centre;
import com.coder_amit.model.Section;
import com.coder_amit.repository.CentreRepository;
import com.coder_amit.repository.SectionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SectionService {

    private final SectionRepository sectionRepository;
    private final CentreRepository centreRepository;

    public SectionService(SectionRepository sectionRepository,
            CentreRepository centreRepository) {
        this.sectionRepository = sectionRepository;
        this.centreRepository = centreRepository;
    }

    // ✅ Create Section
    public Section createSection(Section section, Long centreId) {

        Centre centre = centreRepository.findById(centreId)
                .orElseThrow(() -> new RuntimeException("Centre not found"));

        section.setCentre(centre);
        return sectionRepository.save(section);
    }

    // ✅ Get All Sections
    public List<Section> getAllSections() {

        return sectionRepository.findAll()
                .stream()
                .filter(section -> section.getCentre() != null &&
                        section.getCentre().getZone() != null &&
                        !section.getCentre().getZone().getDeleted())
                .toList();
    }

    // ✅ Get Sections By Centre ID (Important API)
    public List<Section> getSectionsByCentreId(Long centreId) {
        return sectionRepository.findAll()
                .stream()
                .filter(section -> section.getCentre() != null &&
                        section.getCentre().getId().equals(centreId))
                .toList();
    }

    // ✅ Get Section By ID
    public Section getSectionById(Long id) {
        return sectionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Section not found"));
    }

    // ✅ Update Section
    public Section updateSection(Long id, Section sectionDetails, Long centreId) {

        Section section = getSectionById(id);

        Centre centre = centreRepository.findById(centreId)
                .orElseThrow(() -> new RuntimeException("Centre not found"));

        section.setName(sectionDetails.getName());
        section.setStartSeatNumber(sectionDetails.getStartSeatNumber());
        section.setEndSeatNumber(sectionDetails.getEndSeatNumber());
        section.setNumberOfRows(sectionDetails.getNumberOfRows());
        section.setNumberOfColumns(sectionDetails.getNumberOfColumns());
        section.setActive(sectionDetails.getActive());
        section.setStartDate(sectionDetails.getStartDate());
        section.setCentre(centre);

        return sectionRepository.save(section);
    }

    // ✅ Delete Section
    public void deleteSection(Long id) {
        sectionRepository.deleteById(id);
    }

    // ✅ Block / Unblock Section
    public Section blockSection(Long id) {

        Section section = getSectionById(id);

        if (section.getActive() == null) {
            section.setActive(true);
        }

        section.setActive(!section.getActive());

        return sectionRepository.save(section);
    }
}