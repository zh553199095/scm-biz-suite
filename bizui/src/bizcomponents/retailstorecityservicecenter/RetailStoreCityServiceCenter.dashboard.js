

import React, { Component } from 'react'
import { connect } from 'dva'
import moment from 'moment'
import BooleanOption from '../../components/BooleanOption';
import { Button, Row, Col, Icon, Card, Tabs, Table, Radio, DatePicker, Tooltip, Menu, Dropdown,Badge, Switch,Select,Form,AutoComplete,Modal } from 'antd'
import { Link, Route, Redirect} from 'dva/router'
import numeral from 'numeral'
import {
  ChartCard, yuan, MiniArea, MiniBar, MiniProgress, Field, Bar, Pie, TimelineChart,
} from '../../components/Charts'
import Trend from '../../components/Trend'
import NumberInfo from '../../components/NumberInfo'
import { getTimeDistance } from '../../utils/utils'
import PageHeaderLayout from '../../layouts/PageHeaderLayout'
import styles from './RetailStoreCityServiceCenter.dashboard.less'
import DescriptionList from '../../components/DescriptionList';
import ImagePreview from '../../components/ImagePreview';
import GlobalComponents from '../../custcomponents';
import DashboardTool from '../../common/Dashboard.tool'
import appLocaleName from '../../common/Locale.tool'

const {aggregateDataset,calcKey, defaultHideCloseTrans,
  defaultImageListOf,defaultSettingListOf,defaultBuildTransferModal,
  defaultExecuteTrans,defaultHandleTransferSearch,defaultShowTransferModel,
  defaultRenderExtraHeader,
  defaultSubListsOf,defaultRenderAnalytics,
  defaultRenderExtraFooter,renderForTimeLine,renderForNumbers,
  defaultQuickFunctions, defaultRenderSubjectList,
}= DashboardTool



const { Description } = DescriptionList;
const { TabPane } = Tabs
const { RangePicker } = DatePicker
const { Option } = Select


const imageList =(retailStoreCityServiceCenter)=>{return [
	 ]}

const internalImageListOf = (retailStoreCityServiceCenter) =>defaultImageListOf(retailStoreCityServiceCenter,imageList)

const optionList =(retailStoreCityServiceCenter)=>{return [ 
	]}

const buildTransferModal = defaultBuildTransferModal
const showTransferModel = defaultShowTransferModel
const internalRenderSubjectList = defaultRenderSubjectList
const internalSettingListOf = (retailStoreCityServiceCenter) =>defaultSettingListOf(retailStoreCityServiceCenter, optionList)
const internalLargeTextOf = (retailStoreCityServiceCenter) =>{

	return null
	

}


const internalRenderExtraHeader = defaultRenderExtraHeader

const internalRenderExtraFooter = defaultRenderExtraFooter
const internalSubListsOf = defaultSubListsOf


const renderSettingDropDown = (cardsData,targetComponent)=>{

  return (<div style={{float: 'right'}} >
        <Dropdown overlay={renderSettingMenu(cardsData,targetComponent)} placement="bottomRight" >
       
        <Button>
        <Icon type="setting" theme="filled" twoToneColor="#00b" style={{color:'#3333b0'}}/> 设置  <Icon type="down"/>
      </Button>
      </Dropdown></div>)

}

const renderSettingMenuItem = (item,cardsData,targetComponent) =>{

  const userContext = null
  return (<Menu.Item key={item.name}>
      <Link to={`/retailStoreCityServiceCenter/${targetComponent.props.retailStoreCityServiceCenter.id}/list/${item.name}/${item.displayName}/`}>
        <span>{item.displayName}</span>
        </Link>
        </Menu.Item>
  )

}
const renderSettingMenu = (cardsData,targetComponent) =>{

  const userContext = null
  return (<Menu>
    	<Menu.Item key="profile">
  			<Link to={`/retailStoreCityServiceCenter/${targetComponent.props.retailStoreCityServiceCenter.id}/permission`}><Icon type="safety-certificate" theme="twoTone" twoToneColor="#52c41a"/><span>{appLocaleName(userContext,"Permission")}</span></Link>
		</Menu.Item>
		<Menu.Divider />
		{cardsData.subSettingItems.map(item=>renderSettingMenuItem(item,cardsData,targetComponent))}
		</Menu>)

}

const internalRenderTitle = (cardsData,targetComponent) =>{
  
  
  const linkComp=cardsData.returnURL?<Link to={cardsData.returnURL}> <Icon type="double-left" style={{marginRight:"10px"}} /> </Link>:null
  return (<div>{linkComp}{cardsData.cardsName}: {cardsData.displayName} {renderSettingDropDown(cardsData,targetComponent)}</div>)

}


const internalSummaryOf = (retailStoreCityServiceCenter,targetComponent) =>{
	
	
	const {RetailStoreCityServiceCenterService} = GlobalComponents
	const userContext = null
	return (
	<DescriptionList className={styles.headerList} size="small" col="4">
<Description term="序号" style={{wordBreak: 'break-all'}}>{retailStoreCityServiceCenter.id}</Description> 
<Description term="名称" style={{wordBreak: 'break-all'}}>{retailStoreCityServiceCenter.name}</Description> 
<Description term="成立">{ moment(retailStoreCityServiceCenter.founded).format('YYYY-MM-DD')}</Description> 
<Description term="属于">{retailStoreCityServiceCenter.belongsTo==null?appLocaleName(userContext,"NotAssigned"):`${retailStoreCityServiceCenter.belongsTo.displayName}(${retailStoreCityServiceCenter.belongsTo.id})`}
 <Icon type="swap" onClick={()=>
  showTransferModel(targetComponent,"属于","retailStoreProvinceCenter",RetailStoreCityServiceCenterService.requestCandidateBelongsTo,
	      RetailStoreCityServiceCenterService.transferToAnotherBelongsTo,"anotherBelongsToId",retailStoreCityServiceCenter.belongsTo?retailStoreCityServiceCenter.belongsTo.id:"")} 
  style={{fontSize: 20,color:"red"}} />
</Description>
<Description term="最后更新时间">{ moment(retailStoreCityServiceCenter.lastUpdateTime).format('YYYY-MM-DD HH:mm')}</Description> 
	
        {buildTransferModal(retailStoreCityServiceCenter,targetComponent)}
      </DescriptionList>
	)

}

const internalQuickFunctions = defaultQuickFunctions

class RetailStoreCityServiceCenterDashboard extends Component {

 state = {
    transferModalVisiable: false,
    candidateReferenceList: {},
    candidateServiceName:"",
    candidateObjectType:"city",
    targetLocalName:"",
    transferServiceName:"",
    currentValue:"",
    transferTargetParameterName:"",  
    defaultType: 'retailStoreCityServiceCenter'


  }
  componentDidMount() {

  }
  

  render() {
    // eslint-disable-next-line max-len
    const { id,displayName, cityPartnerListMetaInfo, potentialCustomerListMetaInfo, cityEventListMetaInfo, retailStoreListMetaInfo, cityPartnerCount, potentialCustomerCount, cityEventCount, retailStoreCount } = this.props.retailStoreCityServiceCenter
    if(!this.props.retailStoreCityServiceCenter.class){
      return null
    }
    const returnURL = this.props.returnURL
    
    const cardsData = {cardsName:window.trans('retail_store_city_service_center'),cardsFor: "retailStoreCityServiceCenter",
    	cardsSource: this.props.retailStoreCityServiceCenter,returnURL,displayName,
  		subItems: [
{name: 'cityPartnerList', displayName: window.mtrans('city_partner','retail_store_city_service_center.city_partner_list',false) ,viewGroup:'__no_group', type:'cityPartner',count:cityPartnerCount,addFunction: true, role: 'cityPartner', metaInfo: cityPartnerListMetaInfo, renderItem: GlobalComponents.CityPartnerBase.renderItemOfList},
{name: 'potentialCustomerList', displayName: window.mtrans('potential_customer','retail_store_city_service_center.potential_customer_list',false) ,viewGroup:'__no_group', type:'potentialCustomer',count:potentialCustomerCount,addFunction: true, role: 'potentialCustomer', metaInfo: potentialCustomerListMetaInfo, renderItem: GlobalComponents.PotentialCustomerBase.renderItemOfList},
{name: 'cityEventList', displayName: window.mtrans('city_event','retail_store_city_service_center.city_event_list',false) ,viewGroup:'__no_group', type:'cityEvent',count:cityEventCount,addFunction: true, role: 'cityEvent', metaInfo: cityEventListMetaInfo, renderItem: GlobalComponents.CityEventBase.renderItemOfList},
{name: 'retailStoreList', displayName: window.mtrans('retail_store','retail_store_city_service_center.retail_store_list',false) ,viewGroup:'__no_group', type:'retailStore',count:retailStoreCount,addFunction: true, role: 'retailStore', metaInfo: retailStoreListMetaInfo, renderItem: GlobalComponents.RetailStoreBase.renderItemOfList},
    
      	],
   		subSettingItems: [
    
      	],     	
      	
  	};
    
    const renderExtraHeader = this.props.renderExtraHeader || internalRenderExtraHeader
    const settingListOf = this.props.settingListOf || internalSettingListOf
    const imageListOf = this.props.imageListOf || internalImageListOf
    const subListsOf = this.props.subListsOf || internalSubListsOf
    const largeTextOf = this.props.largeTextOf ||internalLargeTextOf
    const summaryOf = this.props.summaryOf || internalSummaryOf
    const renderTitle = this.props.renderTitle || internalRenderTitle
    const renderExtraFooter = this.props.renderExtraFooter || internalRenderExtraFooter
    const renderAnalytics = this.props.renderAnalytics || defaultRenderAnalytics
    const quickFunctions = this.props.quickFunctions || internalQuickFunctions
    const renderSubjectList = this.props.renderSubjectList || internalRenderSubjectList
    
    return (

      <PageHeaderLayout
        title={renderTitle(cardsData,this)}
        content={summaryOf(cardsData.cardsSource,this)}
        wrapperClassName={styles.advancedForm}
      >
       
        {renderExtraHeader(cardsData.cardsSource)}
        
        {quickFunctions(cardsData)} 
        {imageListOf(cardsData.cardsSource)}  
        {renderAnalytics(cardsData.cardsSource)}
        {settingListOf(cardsData.cardsSource)}
        {renderSubjectList(cardsData)}       
        {largeTextOf(cardsData.cardsSource)}
        {renderExtraFooter(cardsData.cardsSource)}
  		
      </PageHeaderLayout>
    
    )
  }
}

export default connect(state => ({
  retailStoreCityServiceCenter: state._retailStoreCityServiceCenter,
  returnURL: state.breadcrumb.returnURL,
  
}))(Form.create()(RetailStoreCityServiceCenterDashboard))

