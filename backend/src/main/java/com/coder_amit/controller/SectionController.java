package com.coder_amit.controller;
import com.coder_amit.model.Section;
import com.coder_amit.service.SectionService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/sections")
public class SectionController {
    private final SectionService sectionService;

    public SectionController(SectionService sectionService) {
        this.sectionService = sectionService;
    }

    @PostMapping("/{centreId}")
    public Section createSection(@RequestBody Section section, @PathVariable Long centreId) {
        return sectionService.createSection(section, centreId);
    }

    @GetMapping
    public List<Section> getAllSections() {
        return sectionService.getAllSections();
    }

    @GetMapping("/{id}")
    public Section getSectionById(@PathVariable Long id) {
        return sectionService.getSectionById(id);
    }

    @PutMapping("/{id}/{centreId}")
    public Section updateSection(@PathVariable Long id, @RequestBody Section sectionDetails, @PathVariable Long centreId) {
        return sectionService.updateSection(id, sectionDetails, centreId);
    }

    @DeleteMapping("/{id}")
    public void deleteSection(@PathVariable Long id) {
        sectionService.deleteSection(id);
    }
}
