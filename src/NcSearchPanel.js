import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Icon from 'bee-icon'
import Button from 'bee-button'
import Dropdown from 'bee-dropdown';
import Menu from 'bee-menus';

const Item = Menu.Item;


const noop = ()=>{}

const propTypes = {
    clsfix:PropTypes.string,
    search:PropTypes.func,
    reset:PropTypes.func
};
const defaultProps = {
    clsfix:'nc-search-panel',
    search:noop,
    reset:noop
};

const typeText = {
    '1':'简单查询',
    '2':'复杂查询'
}

class NcSearchPanel extends Component {
    constructor(props){
        super(props);
        this.state={
            open:true,
            type:'1'
        }
    }
    open=()=>{
        this.setState({
            open:!this.state.open
        })
    }
    onSelect=(item)=>{
        this.setState({
            type:item.selectedKeys[0]
        })
    }
    getChild=()=>{
        let { children } = this.props;
        let child = [];
        if(children.length>1){
            children.map(item=>{
                if(this.state.type=='1'&&item.type.displayName=='Sample'){
                    child = item.props.children;
                }else if(this.state.type=='2'&&item.type.displayName=='Complex'){
                    child = item.props.children;
                }
            })
        }else{
            if(this.state.type=='1'&&children.type.displayName=='Sample'){
                child = children.props.children;
            }else if(this.state.type=='2'&&children.type.displayName=='Complex'){
                child = children.props.children;
            }
        }
        return child;
    }
    render(){
        let { clsfix,search,reset } = this.props;
        let ctns = `${clsfix}-ctns`;
        if(!this.state.open)ctns+=' close';
        const menus = (
            <Menu
              onSelect={this.onSelect}>
              <Item key="1">简单查询</Item>
              <Item key="2">复杂查询</Item>
            </Menu>
        );

        return(
            <div className={clsfix}>
                <div className={`${clsfix}-header`} >
                    <span className={`${clsfix}-case`}>
                        <Dropdown
                            overlayClassName={`${clsfix}-case-list`}
                            trigger={['click']}
                            overlay={menus}
                            animation="slide-up">
                            <span>{typeText[this.state.type]} <Icon type='uf-triangle-down'/></span>
                        </Dropdown>
                    </span>

                    <span className={`${clsfix}-selected`}>
                        高级(暂不可用)
                    </span>
                    <span className={`${clsfix}-open`} onClick={this.open}>
                        
                        
                        {
                            this.state.open?
                            <span>
                            展开<Icon type='uf-arrow-up'/>
                            </span>
                            :<span>
                            收起<Icon type='uf-arrow-down'/>
                            </span>
                        }
                    </span>
                </div>
                <div className={`${clsfix}-ctns-out`}>
                    <div className={ctns}>
                        <div className={`${clsfix}-ctn`}>
                            {
                                this.getChild()
                            }
                        </div>
                        <div className={`${clsfix}-btns`}>
                            <Button colors='primary' className={`${clsfix}-btns-search`} onClick={search}>
                                <Icon type='uf-search-light-2'/>
                            </Button>
                            <Button colors='primary' bordered className={`${clsfix}-btns-reset`} onClick={reset}>
                                <Icon type='uf-clean'/>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            
        )
    }
};

NcSearchPanel.propTypes = propTypes;
NcSearchPanel.defaultProps = defaultProps;

export default NcSearchPanel;