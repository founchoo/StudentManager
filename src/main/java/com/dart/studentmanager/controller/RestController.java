package com.dart.studentmanager.controller;

import com.dart.studentmanager.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@org.springframework.web.bind.annotation.RestController
public class RestController {

    @Autowired
    private StudentService studentService;

    @RequestMapping("/check")
    public boolean checkStudentById(HttpServletRequest request, String id){
        return studentService.getStudentById(id) != null;
    }
}
