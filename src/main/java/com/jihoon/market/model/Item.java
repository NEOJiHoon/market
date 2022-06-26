package com.jihoon.market.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
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
}
