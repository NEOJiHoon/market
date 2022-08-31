package com.jihoon.market.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString(exclude = {"imgOne", "imgTwo", "imgThree"}) // 이미지 바이트가 서버로그에 찍히지 않도록 문자열 출력시 제외시킴
public class Item {
    private String memId;
    private Long itemNo;
    private String title;
    private String contents;
    private BigDecimal price;
    private byte[] imgOne;
    private byte[] imgTwo;
    private byte[] imgThree;
    private LocalDateTime createDt;
    private String soldOutYn;
    private LocalDateTime soldOutDt;
    private String delYn;
    private LocalDateTime delDt;
    private String nicNm;
    private String itemTp; // 상품분류 필드 추가
}
