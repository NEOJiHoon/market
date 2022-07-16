package com.jihoon.market.controller;

import com.jihoon.market.mapper.MemberMapper;
import com.jihoon.market.model.Member;
import com.jihoon.market.util.SHA256;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping("/member")
@RestController
public class MemberController {

    @Autowired
    MemberMapper memberMapper;

    @PostMapping()
    public int createMember(@RequestBody Member member) {
        log.info("create member: {}", member);

        int result = -1;
        try {
            String pw = member.getMemPw();
            String hash = SHA256.encrypt(pw);
            member.setMemPw(hash);

            result = memberMapper.insertMember(member);
        } catch (DataIntegrityViolationException e) { // 데이터 무경성 위반 인경우
            log.warn(" --- 중복 ---" );
            // 아이디가 중복됐습니다. 다른 아이디로 가입해주세요.
            result = -2;
        } catch (Exception e) {
            log.warn(" --- 알 수 없는 오류발생 --- ");
            result = -1;
        }
        return result;

    }

    @PutMapping()
    public int modifyMember(Member member) {
        log.info("modify member: {}", member);
        return memberMapper.updateMember(member);
    }
}
