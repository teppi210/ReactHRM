import React from 'react';
import { Menu} from'antd';
import { Link , withRouter} from 'react-router-dom';
import headerStyle from './index.less';
import { connect } from 'react-redux';
import { switchMenuTheme } from './../../redux/actions/themeAction'

class HeaderRoute extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state = {
            display_name: 'none', //此状态机为display的取值
            display_old: 'block',
        }
    }
    componentWillMount=()=>{
        console.log('当前路由信息',this.props.location)
    }
    handleMenuClick = ({item,key})=>{
        let name = item.props.children.props.children
        console.log(name);
        console.log(this.props);
        if(this.props.onSwitchColor){
            this.props.onSwitchColor(name);
        }
    }
    display_name() { //编辑按钮的单击事件，修改状态机display_name的取值
        //alert(this.state.display_name);
        const displayState = {
            display_name: 'block',
            display_old: 'none',
            display_page: '/test.html',
        };
        this.props.getStates(displayState);
        return false;
        // if (this.state.display_name === 'none') {
        //     this.setState({
        //         display_name: 'block',
        //         display_old: 'none',
        //     },()=>{
        //         //alert(this.state.display_name+"   "+this.state.display_old);
        //     })
        // }
    }
    handle=()=>{
        const displayState = {
            display_name: 'none',
            display_old: 'block',
            display: '/',
        };
        this.props.getStates(displayState);
    }
    render(){
        return(
            <div className={headerStyle['header-top']} >
            
                <div className={headerStyle['logo']} >ICBC人力资源管理系统</div>
                <div className= {headerStyle['head-route']}>
                    <Menu
                    theme="dark"
                    mode="horizontal"
                    onClick={this.handleMenuClick}
                    defaultSelectedKeys={['1']}
                >
                    <Menu.Item key="1"><Link to={{ pathname: '/workerService'}} onClick={this.handle}>员工服务</Link></Menu.Item>
                    <Menu.Item key="2"><Link to={{ pathname: '/smartManage'}} onClick={this.handle}>智慧管理</Link></Menu.Item>
                    <Menu.Item key="3"><Link to={{ pathname: '/workDo'}} onClick={this.handle}>业务处理</Link></Menu.Item>
                    <Menu.Item key="4"><Link to={{ pathname: '/test'}} onClick={this.handle}>测试页面</Link></Menu.Item>
                    <Menu.Item key="5"><span onClick={this.display_name.bind(this)}>外部页面</span></Menu.Item>
                    </Menu>
                </div>
                <div className=  {headerStyle['user-info']}>user-info:张三</div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return{
        
    }
}

const mapDispatchToProps = (dispatch)=>{
    return{
        onSwitchColor:(menuName)=>{
            dispatch(switchMenuTheme(menuName));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withRouter(HeaderRoute));
//export default withRouter(HeaderRoute);