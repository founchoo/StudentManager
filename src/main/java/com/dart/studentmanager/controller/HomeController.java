package com.dart.studentmanager.controller;

import com.dart.studentmanager.entity.Student;
import com.dart.studentmanager.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

import static java.lang.Integer.parseInt;

@Controller
public class HomeController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/")
    public String getAllStudents(HttpServletRequest request, Model model){

        List<Student> students = new ArrayList<>();
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie: cookies) {
                if (cookie.getName().equals("username")){
                    if (cookie.getValue().equals("")) {
                        students.add(new Student("您未登录", "", "", "", "", "", "", ""));
                    } else if (cookie.getValue().equals("admin")) {
                        students = studentService.getAllStudent();
                    } else {
                        students.add(new Student("您无权查看此列表", "", "", "", "", "", "", ""));
                    }
                    break;
                }
            }
        }
        model.addAttribute("students", students);
        return "index";
    }

    @RequestMapping("/delete")
    public String deleteStudent(HttpServletRequest request, String id){

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie: cookies) {
                if (cookie.getName().equals("username") && cookie.getValue().equals("admin")) {
                    String[] ids = id.split(",");
                    for (String id1:ids) {
                        studentService.deleteStudentById(id1);
                    }
                }
            }
        }
        return "index";
    }

    @RequestMapping("/add")
    public String addStudent(HttpServletRequest request, String id, String name, String age, String sex, String birth, String address, String phone, String email){

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie: cookies) {
                if (cookie.getName().equals("username") && cookie.getValue().equals("admin")) {
                    String[] ids = id.split(",");
                    String[] names = name.split(",");
                    String[] ages = age.split(",");
                    String[] sexes = sex.split(",");
                    String[] births = birth.split(",");
                    String[] addresses = address.split(",");
                    String[] phones = phone.split(",");
                    String[] emails = email.split(",");
                    for (int i = 0; i < ids.length; i++) {
                        Student student = studentService.getStudentById(id);
                        if (student == null) {
                            studentService.addStudent(ids[i], names[i], ages[i], sexes[i], births[i], addresses[i], phones[i], emails[i]);
                        }
                    }
                }
            }
        }
        return "index";
    }

    @RequestMapping("/modify")
    public String modifyStudent(HttpServletRequest request, String id, String name, String age, String sex, String birth, String address, String phone, String email){

        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie: cookies) {
                if (cookie.getName().equals("username") && cookie.getValue().equals("admin")) {
                    studentService.modifyStudent(id.split(",")[0], name.split(",")[0], age.split(",")[0], sex.split(",")[0], birth.split(",")[0], address.split(",")[0], phone.split(",")[0], email.split(",")[0]);
                }
            }
        }
        return "index";
    }

    @RequestMapping("/get")
    public ModelAndView getStudent(HttpServletRequest request, String key){

        Cookie[] cookies = request.getCookies();
        ModelAndView mv = new ModelAndView();
        mv.setViewName("index");
        List<Student> students = new ArrayList<>();
        if (cookies != null) {
            for (Cookie cookie: cookies) {
                if (cookie.getName().equals("username")) {
                    Student studentFoundById = studentService.getStudentById(key);
                    Student studentFoundByName = studentService.getStudentByName(key);
                    if (studentFoundById != null) {
                        students.add(studentFoundById);
                    }
                    if (studentFoundByName != null) {
                        students.add(studentFoundByName);
                    }
                    if (students.size() == 0) {
                        students.add(new Student("未查询到相关学生信息", "", "", "", "", "", "", ""));
                    }
                    break;
                }
            }
        }
        mv.addObject("students", students);
        mv.addObject("keyword", key);
        return mv;
    }

    @RequestMapping("/sort")
    public ModelAndView sortStudents(HttpServletRequest request, String type){

        Cookie[] cookies = request.getCookies();
        ModelAndView mv = new ModelAndView();
        mv.setViewName("index");
        List<Student> students = new ArrayList<>();
        if (cookies != null) {
            for (Cookie cookie: cookies) {
                if (cookie.getName().equals("username")) {
                    if (cookie.getValue().equals("admin")) {
                        students = studentService.getAllStudent();
                        if (type.equals("name")) {
                            students.sort((Student s1, Student s2) -> s1.getName().compareTo(s2.getName()));
                            mv.addObject("sortByName", "selected");
                        } else {
                            students.sort((Student s1, Student s2) -> s1.getId().compareTo(s2.getId()));
                            mv.addObject("sortById", "selected");
                        }
                    } else {
                        students.add(new Student("您无权查看此列表", "", "", "", "", "", "", ""));
                    }
                    break;
                }
            }
        }
        mv.addObject("students", students);
        return mv;
    }
    
}
