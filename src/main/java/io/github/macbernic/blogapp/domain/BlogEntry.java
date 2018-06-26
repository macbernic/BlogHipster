package io.github.macbernic.blogapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A BlogEntry.
 */
@Entity
@Table(name = "blog_entry")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BlogEntry implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Size(min = 3)
    @Column(name = "title", nullable = false)
    private String title;

    @Lob
    @Column(name = "content")
    private String content;

    @NotNull
    @Column(name = "_date", nullable = false)
    private Instant date;

    @ManyToOne
    @JsonIgnoreProperties("")
    private Blog blog;

    @ManyToOne
    @JsonIgnoreProperties("")
    private User writtenBy;

    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(name = "blog_entry_tag",
               joinColumns = @JoinColumn(name = "blog_entries_id", referencedColumnName = "id"),
               inverseJoinColumns = @JoinColumn(name = "tags_id", referencedColumnName = "id"))
    private Set<Tag> tags = new HashSet<>();

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

    public BlogEntry title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public BlogEntry content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getDate() {
        return date;
    }

    public BlogEntry date(Instant date) {
        this.date = date;
        return this;
    }

    public void setDate(Instant date) {
        this.date = date;
    }

    public Blog getBlog() {
        return blog;
    }

    public BlogEntry blog(Blog blog) {
        this.blog = blog;
        return this;
    }

    public void setBlog(Blog blog) {
        this.blog = blog;
    }

    public User getWrittenBy() {
        return writtenBy;
    }

    public BlogEntry writtenBy(User user) {
        this.writtenBy = user;
        return this;
    }

    public void setWrittenBy(User user) {
        this.writtenBy = user;
    }

    public Set<Tag> getTags() {
        return tags;
    }

    public BlogEntry tags(Set<Tag> tags) {
        this.tags = tags;
        return this;
    }

    public BlogEntry addTag(Tag tag) {
        this.tags.add(tag);
        tag.getEntries().add(this);
        return this;
    }

    public BlogEntry removeTag(Tag tag) {
        this.tags.remove(tag);
        tag.getEntries().remove(this);
        return this;
    }

    public void setTags(Set<Tag> tags) {
        this.tags = tags;
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
        BlogEntry blogEntry = (BlogEntry) o;
        if (blogEntry.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), blogEntry.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "BlogEntry{" +
            "id=" + getId() +
            ", title='" + getTitle() + "'" +
            ", content='" + getContent() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
