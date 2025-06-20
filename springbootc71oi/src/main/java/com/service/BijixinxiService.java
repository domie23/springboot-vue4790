package com.service;

import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.service.IService;
import com.utils.PageUtils;
import com.entity.BijixinxiEntity;
import java.util.List;
import java.util.Map;
import com.entity.vo.BijixinxiVO;
import org.apache.ibatis.annotations.Param;
import com.entity.view.BijixinxiView;


/**
 * 笔记信息
 *
 * @author 
 * @email 
 * @date 2023-02-08 11:44:37
 */
public interface BijixinxiService extends IService<BijixinxiEntity> {

    PageUtils queryPage(Map<String, Object> params);
    
   	List<BijixinxiVO> selectListVO(Wrapper<BijixinxiEntity> wrapper);
   	
   	BijixinxiVO selectVO(@Param("ew") Wrapper<BijixinxiEntity> wrapper);
   	
   	List<BijixinxiView> selectListView(Wrapper<BijixinxiEntity> wrapper);
   	
   	BijixinxiView selectView(@Param("ew") Wrapper<BijixinxiEntity> wrapper);
   	
   	PageUtils queryPage(Map<String, Object> params,Wrapper<BijixinxiEntity> wrapper);
   	

}

