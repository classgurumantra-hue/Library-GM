package com.coder_amit.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
@RestController
public class HomeController {

    @GetMapping("/")
    public String home(){
        return "Backend Server Running Successfully ✅";
    }
}