package com.coder_amit.controller;

import com.coder_amit.model.State;
import com.coder_amit.repository.StateRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/states")
@CrossOrigin
public class StateController {

    private final StateRepository stateRepository;

    public StateController(StateRepository stateRepository) {
        this.stateRepository = stateRepository;
    }

    @GetMapping
    public List<State> getStates() {
        return stateRepository.findByActiveTrue();
    }
}