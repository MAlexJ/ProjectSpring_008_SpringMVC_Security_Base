package com.malexj.entity;

public class CommentEntity {
    private Long id_pattern;
    private Long id_account;
    private String text;

    public CommentEntity() {
    }

    public Long getId_pattern() {
        return id_pattern;
    }

    public void setId_pattern(Long id_patterns) {
        this.id_pattern = id_patterns;
    }

    public Long getId_account() {
        return id_account;
    }

    public void setId_account(Long id_account) {
        this.id_account = id_account;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    @Override
    public String toString() {
        return "CommentEntity{" +
                "id_patterns=" + id_pattern +
                ", id_account=" + id_account +
                ", text='" + text + '\'' +
                '}';
    }
}
