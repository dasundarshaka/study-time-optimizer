package com.example.simplex.controller;

import com.example.simplex.model.GpaRequest;
import com.example.simplex.service.SimplexSolver;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api")
public class SolverController {

    @PostMapping("/solve")
    public Map<String, Object> solve(@RequestBody GpaRequest request) {
        return SimplexSolver.solve(request);
    }
}
