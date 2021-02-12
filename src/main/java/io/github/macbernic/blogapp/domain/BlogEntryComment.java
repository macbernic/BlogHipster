package io.github.macbernic.blogapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A BlogEntryComment.
 */
@Entity
@Table(name = "blog_entry_comment")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BlogEntryComment implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title")
    private String title;

    @Lob
    @Column(name = "content")
    private String content;

    @NotNull
    @Column(name = "_date", nullable = false)
    private Instant date;

    @ManyToOne
    @JsonIgnoreProperties("")
    private BlogEntry blogEntry;

    @ManyToOne
    @JsonIgnoreProperties("")
    private BlogEntryComment parent;

    @ManyToOne
    @JsonIgnoreProperties("")
    private User writtenBy;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public BlogEntryComment title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public BlogEntryComment content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getDate() {
        return date;
    }

    public BlogEntryComment date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public BlogEntry getBlogEntry() {
        return blogEntry;
    }

    public BlogEntryComment blogEntry(BlogEntry blogEntry) {
        this.blogEntry = blogEntry;
        return this;
    }

    public void setBlogEntry(BlogEntry blogEntry) {
        this.blogEntry = blogEntry;
    }

    public BlogEntryComment getParent() {
        return parent;
    }

    public BlogEntryComment parent(BlogEntryComment blogEntryComment) {
        this.parent = blogEntryComment;
        return this;
    }

    public void setParent(BlogEntryComment blogEntryComment) {
        this.parent = blogEntryComment;
    }

    public User getWrittenBy() {
        return writtenBy;
    }

    public BlogEntryComment writtenBy(User user) {
        this.writtenBy = user;
        return this;
    }

    public void setWrittenBy(User user) {
        this.writtenBy = user;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        BlogEntryComment blogEntryComment = (BlogEntryComment) o;
        if (blogEntryComment.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), blogEntryComment.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BlogEntryComment{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", content='" + getContent() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
