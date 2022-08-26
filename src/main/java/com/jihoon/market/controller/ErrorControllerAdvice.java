package com.jihoon.market.controller;

import com.jihoon.market.exception.CommonException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@Slf4j
@ControllerAdvice // 컨트롤러에서 예외가 발생 경우에 예외를 처리하는 클래스
public class ErrorControllerAdvice {
    @ExceptionHandler(CommonException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST) // HTTP 상태코드: 잘못된 요청 (400)
    @ResponseBody String handleCommonException(CommonException e) {
        log.info("COMMON EXCEPTION: {}", e.getMessage());  //예외의 메시지만 로깅처리
        return e.getMessage();  // 예외의 메시지를 응답으로 리턴
    }

    @ExceptionHandler({Exception.class}) // Exection은 모든 예외의 부모
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR) // HTTP 상태코드: 내부 서버 오류 (500)
    @ResponseBody String handleUnknownException(Exception e) {
        log.error("handleUnknownException", e);  // 예외를 오류로 로깅처리
        return e.getMessage(); // 예외의 메시지를 응답으로 리턴
    }

}
