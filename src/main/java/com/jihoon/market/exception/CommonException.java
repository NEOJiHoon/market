package com.jihoon.market.exception;

// JH 마켓 프로젝트에서 공통적으로 예외를 처리할 클래스 생성
public class CommonException extends RuntimeException{
    public CommonException(String message) {
        super(message);
    }
}
