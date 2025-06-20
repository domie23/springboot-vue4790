package com.entity;

import com.baomidou.mybatisplus.annotations.TableId;
import com.baomidou.mybatisplus.annotations.TableName;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.lang.reflect.InvocationTargetException;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;
import com.fasterxml.jackson.annotation.JsonFormat;
import org.apache.commons.beanutils.BeanUtils;
import com.baomidou.mybatisplus.annotations.TableField;
import com.baomidou.mybatisplus.enums.FieldFill;
import com.baomidou.mybatisplus.enums.IdType;


/**
 * 菜谱信息
 * 数据库通用操作实体类（普通增删改查）
 * @author 
 * @email 
 * @date 2023-02-08 11:44:37
 */
@TableName("caipuxinxi")
public class CaipuxinxiEntity<T> implements Serializable {
	private static final long serialVersionUID = 1L;


	public CaipuxinxiEntity() {
		
	}
	
	public CaipuxinxiEntity(T t) {
		try {
			BeanUtils.copyProperties(this, t);
		} catch (IllegalAccessException | InvocationTargetException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	/**
	 * 主键id
	 */
	@TableId
	private Long id;
	/**
	 * 菜谱名称
	 */
					
	private String caipumingcheng;
	
	/**
	 * 菜品分类
	 */
					
	private String caipinfenlei;
	
	/**
	 * 菜谱封面
	 */
					
	private String caipufengmian;
	
	/**
	 * 口味
	 */
					
	private String kouwei;
	
	/**
	 * 材料
	 */
					
	private String cailiao;
	
	/**
	 * 制作工艺
	 */
					
	private String zhizuogongyi;
	
	/**
	 * 适应人群
	 */
					
	private String shiyingrenqun;
	
	/**
	 * 功效营养
	 */
					
	private String gongxiaoyingyang;
	
	/**
	 * 菜谱详情
	 */
					
	private String caipuxiangqing;
	
	/**
	 * 赞
	 */
					
	private Integer thumbsupnum;
	
	/**
	 * 踩
	 */
					
	private Integer crazilynum;
	
	/**
	 * 最近点击时间
	 */
				
	@JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd HH:mm:ss")
	@DateTimeFormat 		
	private Date clicktime;
	
	
	@JsonFormat(locale="zh", timezone="GMT+8", pattern="yyyy-MM-dd HH:mm:ss")
	@DateTimeFormat
	private Date addtime;

	public Date getAddtime() {
		return addtime;
	}
	public void setAddtime(Date addtime) {
		this.addtime = addtime;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}
	/**
	 * 设置：菜谱名称
	 */
	public void setCaipumingcheng(String caipumingcheng) {
		this.caipumingcheng = caipumingcheng;
	}
	/**
	 * 获取：菜谱名称
	 */
	public String getCaipumingcheng() {
		return caipumingcheng;
	}
	/**
	 * 设置：菜品分类
	 */
	public void setCaipinfenlei(String caipinfenlei) {
		this.caipinfenlei = caipinfenlei;
	}
	/**
	 * 获取：菜品分类
	 */
	public String getCaipinfenlei() {
		return caipinfenlei;
	}
	/**
	 * 设置：菜谱封面
	 */
	public void setCaipufengmian(String caipufengmian) {
		this.caipufengmian = caipufengmian;
	}
	/**
	 * 获取：菜谱封面
	 */
	public String getCaipufengmian() {
		return caipufengmian;
	}
	/**
	 * 设置：口味
	 */
	public void setKouwei(String kouwei) {
		this.kouwei = kouwei;
	}
	/**
	 * 获取：口味
	 */
	public String getKouwei() {
		return kouwei;
	}
	/**
	 * 设置：材料
	 */
	public void setCailiao(String cailiao) {
		this.cailiao = cailiao;
	}
	/**
	 * 获取：材料
	 */
	public String getCailiao() {
		return cailiao;
	}
	/**
	 * 设置：制作工艺
	 */
	public void setZhizuogongyi(String zhizuogongyi) {
		this.zhizuogongyi = zhizuogongyi;
	}
	/**
	 * 获取：制作工艺
	 */
	public String getZhizuogongyi() {
		return zhizuogongyi;
	}
	/**
	 * 设置：适应人群
	 */
	public void setShiyingrenqun(String shiyingrenqun) {
		this.shiyingrenqun = shiyingrenqun;
	}
	/**
	 * 获取：适应人群
	 */
	public String getShiyingrenqun() {
		return shiyingrenqun;
	}
	/**
	 * 设置：功效营养
	 */
	public void setGongxiaoyingyang(String gongxiaoyingyang) {
		this.gongxiaoyingyang = gongxiaoyingyang;
	}
	/**
	 * 获取：功效营养
	 */
	public String getGongxiaoyingyang() {
		return gongxiaoyingyang;
	}
	/**
	 * 设置：菜谱详情
	 */
	public void setCaipuxiangqing(String caipuxiangqing) {
		this.caipuxiangqing = caipuxiangqing;
	}
	/**
	 * 获取：菜谱详情
	 */
	public String getCaipuxiangqing() {
		return caipuxiangqing;
	}
	/**
	 * 设置：赞
	 */
	public void setThumbsupnum(Integer thumbsupnum) {
		this.thumbsupnum = thumbsupnum;
	}
	/**
	 * 获取：赞
	 */
	public Integer getThumbsupnum() {
		return thumbsupnum;
	}
	/**
	 * 设置：踩
	 */
	public void setCrazilynum(Integer crazilynum) {
		this.crazilynum = crazilynum;
	}
	/**
	 * 获取：踩
	 */
	public Integer getCrazilynum() {
		return crazilynum;
	}
	/**
	 * 设置：最近点击时间
	 */
	public void setClicktime(Date clicktime) {
		this.clicktime = clicktime;
	}
	/**
	 * 获取：最近点击时间
	 */
	public Date getClicktime() {
		return clicktime;
	}

}
