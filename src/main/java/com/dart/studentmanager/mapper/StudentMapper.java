package com.dart.studentmanager.mapper;

import java.util.List;

import com.dart.studentmanager.entity.Student;
import org.springframework.stereotype.Repository;

//@Mapper         //声明是一个Mapper,与springbootApplication中的@MapperScan二选一写上即可
@Repository
public interface StudentMapper {

    List<Student> getAllStudent();

    Student getStudentById(String id);

    Student getStudentByName(String name);

    void deleteStudentById(String id);

    void addStudent(String id, String name, String age, String sex, String birth, String address, String phone, String email);

    void modifyStudent(String id, String name, String age, String sex, String birth, String address, String phone, String email);
}