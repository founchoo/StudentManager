package com.dart.studentmanager.service;

import com.dart.studentmanager.entity.Student;

import java.util.List;

public interface StudentService {

    List<Student> getAllStudent();
    Student getStudentById(String id);
    Student getStudentByName(String name);
    void deleteStudentById(String id);
    void addStudent(String id, String name, String age, String sex, String birth, String address, String phone, String email);
    void modifyStudent(String id, String name, String age, String sex, String birth, String address, String phone, String email);
}