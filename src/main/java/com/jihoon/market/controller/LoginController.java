package com.jihoon.market.controller;


import com.jihoon.market.mapper.MemberMapper;
import com.jihoon.market.model.Member;
import com.jihoon.market.util.SHA256;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.security.NoSuchAlgorithmException;

@RequestMapping("/login")
@RestController
public class LoginController {

    @Autowired
    MemberMapper memberMapper;

    @PostMapping
    public Member login(@RequestBody Member member,
                        HttpServletRequest request) throws NoSuchAlgorithmException {
        String id = member.getMemId();
        String pw = member.getMemPw();
        if (id == null || "".equals(id.trim())) {
          throw new RuntimeException("아이디를 정확히 입력하세요.");
         //   return "아이디를 정확히 입력하세요.";
        } else if (pw == null || "".equals(pw.trim())) {
           throw new RuntimeException("패스워드를 정확히 입력하세요.");
         //   return "패스워드를 정확히 입력하세요.";
        }
        Member dbMember = memberMapper.selectMember(id);
        String hash = SHA256.encrypt(pw);
        if (dbMember == null || !hash.equals(dbMember.getMemPw())) {
           throw new RuntimeException("잘못된 로그인 정보입니다.");
         //     return "잘못된 로그인 정보입니다.";
        }
        // 로그인 성공
        HttpSession session = request.getSession();
        session.setAttribute("id", id);

        return dbMember;
    }

    @GetMapping("/is")
    public int isLogin(HttpServletRequest request) {
        HttpSession session = request.getSession();
        String id = (String) session.getAttribute("id");
        if (!request.isRequestedSessionIdValid() || id == null || id.trim().equals("")) {
            return -1;
        } else {
            return 1;
        }
    }
}
