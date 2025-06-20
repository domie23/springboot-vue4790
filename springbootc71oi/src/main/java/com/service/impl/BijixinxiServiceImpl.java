package com.service.impl;

import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.List;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.mapper.EntityWrapper;
import com.baomidou.mybatisplus.plugins.Page;
import com.baomidou.mybatisplus.service.impl.ServiceImpl;
import com.utils.PageUtils;
import com.utils.Query;


import com.dao.BijixinxiDao;
import com.entity.BijixinxiEntity;
import com.service.BijixinxiService;
import com.entity.vo.BijixinxiVO;
import com.entity.view.BijixinxiView;

@Service("bijixinxiService")
public class BijixinxiServiceImpl extends ServiceImpl<BijixinxiDao, BijixinxiEntity> implements BijixinxiService {
	
	
    @Override
    public PageUtils queryPage(Map<String, Object> params) {
        Page<BijixinxiEntity> page = this.selectPage(
                new Query<BijixinxiEntity>(params).getPage(),
                new EntityWrapper<BijixinxiEntity>()
        );
        return new PageUtils(page);
    }
    
    @Override
	public PageUtils queryPage(Map<String, Object> params, Wrapper<BijixinxiEntity> wrapper) {
		  Page<BijixinxiView> page =new Query<BijixinxiView>(params).getPage();
	        page.setRecords(baseMapper.selectListView(page,wrapper));
	    	PageUtils pageUtil = new PageUtils(page);
	    	return pageUtil;
 	}
    
    @Override
	public List<BijixinxiVO> selectListVO(Wrapper<BijixinxiEntity> wrapper) {
 		return baseMapper.selectListVO(wrapper);
	}
	
	@Override
	public BijixinxiVO selectVO(Wrapper<BijixinxiEntity> wrapper) {
 		return baseMapper.selectVO(wrapper);
	}
	
	@Override
	public List<BijixinxiView> selectListView(Wrapper<BijixinxiEntity> wrapper) {
		return baseMapper.selectListView(wrapper);
	}

	@Override
	public BijixinxiView selectView(Wrapper<BijixinxiEntity> wrapper) {
		return baseMapper.selectView(wrapper);
	}


}
