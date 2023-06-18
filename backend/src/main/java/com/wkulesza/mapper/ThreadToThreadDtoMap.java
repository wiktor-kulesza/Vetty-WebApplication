package com.wkulesza.mapper;

import com.wkulesza.dto.ThreadDto;
import com.wkulesza.entity.Thread;
import org.modelmapper.PropertyMap;

public class ThreadToThreadDtoMap extends PropertyMap<Thread, ThreadDto> {
    @Override
    protected void configure() {

        map().setId(source.getId());
        map().setAuthorEmail(source.getAuthor().getEmail());
        map().setTitle(source.getTitle());
        map().setContent(source.getContent());
    }
}
