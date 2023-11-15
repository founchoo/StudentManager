package com.dart.studentmanager.service.impl;

import com.dart.studentmanager.entity.Student;
import com.dart.studentmanager.mapper.StudentMapper;
import com.dart.studentmanager.service.StudentService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service(value = "userService")
public class StudentServiceImpl implements StudentService {

    @Resource
    private StudentMapper userMapper;


    @Override
    public List<Student> getAllStudent() {
        return userMapper.getAllStudent();
    }

    @Override
    public Student getStudentById(String id){
        return userMapper.getStudentById(id);
    }

    @Override
    public Student getStudentByName(String name) {
        return userMapper.getStudentByName(name);
    }

    @Override
    public void deleteStudentById(String id){
        userMapper.deleteStudentById(id);
    }

    @Override
    public void addStudent(String id, String name, String age, String sex, String birth, String address, String phone, String email){
        userMapper.addStudent(id, name, age, sex, birth, address, phone, email);
    }

    @Override
    public void modifyStudent(String id, String name, String age, String sex, String birth, String address, String phone, String email){
        userMapper.modifyStudent(id, name, age, sex, birth, address, phone, email);
    }
}