package com.jihoon.market.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@RequestMapping("/logout")
@RestController
public class LogoutController {
    @GetMapping
    public String logout(HttpServletRequest request) {
        HttpSession session = request.getSession();
        session.invalidate(); // session을 무효화시킴
        return "success";
    }
}
