-- 회원
DROP TABLE IF EXISTS MEMBER RESTRICT;

-- 회원
CREATE TABLE MEMBER (
                        MEM_ID  VARCHAR(30)  NOT NULL, -- 회원ID
                        MEM_NM  VARCHAR(50)  NULL,     -- 회원이름
                        NIC_NM  VARCHAR(50)  NULL,     -- 닉네임
                        MEM_PW  VARCHAR(512) NULL,     -- 회원패스워드
                        MEM_CP  VARCHAR(20)  NULL,     -- 회원휴대폰
                        MEM_IMG MEDIUMBLOB   NULL      -- 멤버사진
);

-- 회원
ALTER TABLE MEMBER
    ADD CONSTRAINT PK_MEMBER -- 회원 기본키
        PRIMARY KEY (
                     MEM_ID -- 회원ID
            );

-- 상품
DROP TABLE IF EXISTS ITEM RESTRICT;

-- 상품
CREATE TABLE ITEM (
                      MEM_ID      VARCHAR(30)     NOT NULL, -- 회원ID
                      ITEM_NO     BIGINT UNSIGNED NOT NULL, -- 상품번호
                      TITLE       VARCHAR(200)    NULL,     -- 제목
                      CONTENTS    VARCHAR(4000)   NULL,     -- 내용
                      PRICE       DECIMAL(28,8)   NULL     DEFAULT 0, -- 가격
                      IMG_ONE     MEDIUMBLOB      NULL,     -- 이미지1
                      IMG_TWO     MEDIUMBLOB      NULL,     -- 이미지2
                      IMG_THREE   MEDIUMBLOB      NULL,     -- 이미지3
                      CREATE_DT   DATETIME        NULL,     -- 등록일시
                      SOLD_OUT_YN CHAR(1)         NULL     DEFAULT 'N', -- 판매완료여부
                      SOLD_OUT_DT DATETIME        NULL,     -- 판매완료일시
                      DEL_YN      CHAR(1)         NULL     DEFAULT 'N', -- 삭제여부
                      DEL_DT      DATETIME        NULL      -- 삭제일시
);

-- 상품
ALTER TABLE ITEM
    ADD CONSTRAINT PK_ITEM -- 상품 기본키
        PRIMARY KEY (
                     MEM_ID,  -- 회원ID
                     ITEM_NO  -- 상품번호
            );

-- 상품 채팅
DROP TABLE IF EXISTS ITEM_CHAT RESTRICT;

-- 상품 채팅
CREATE TABLE ITEM_CHAT (
                           MEM_ID    VARCHAR(30)     NOT NULL, -- 회원ID
                           ITEM_NO   BIGINT UNSIGNED NOT NULL, -- 상품번호
                           TO_MEM_ID VARCHAR(30)     NOT NULL, -- 상대회원ID
                           CHAT_NO   BIGINT UNSIGNED NOT NULL, -- 채팅번호
                           MSG       VARCHAR(200)    NULL,     -- 메세지
                           WRITER_TP INTEGER(1)      NULL,     -- 작성자구분
                           CREATE_DT DATETIME        NULL      -- 등록일시
);

-- 상품 채팅
ALTER TABLE ITEM_CHAT
    ADD CONSTRAINT PK_ITEM_CHAT -- 상품 채팅 기본키
        PRIMARY KEY (
                     MEM_ID,    -- 회원ID
                     ITEM_NO,   -- 상품번호
                     TO_MEM_ID, -- 상대회원ID
                     CHAT_NO    -- 채팅번호
            );