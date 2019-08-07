import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

const propTypes = {
    label:PropTypes.string.isRequired,
    required:PropTypes.bool,
    value:PropTypes.string
};
const defaultProps = {

};

class FormItem extends Component {
    constructor(props){
        super(props);
        this.state = {
            show:false,
            strTop:'-28px'
        }
        
    }

    getChild=()=>{
        let { label , children } = this.props;
        if(children.length>1){
            let ary = [];
            React.Children.map(children,child=>{
                    ary.push(React.cloneElement(child,{
                        placeholder:label,
                    }))
                })
            return ary;
            
        }else{
            return React.cloneElement(children,{
                        placeholder:label,
                    })
        }
    }
    getStr=()=>{
        let { children, label, tooltip} = this.props;
        let value = children.props.value||'';
        let str = '';
        if(tooltip){
            str = `${label}: ${tooltip}`;
        }else if(children.type.displayName=='InputNumberGroup'){//金额区间
            if(value.length>0&&((value[0])||(value[1]))){
                str = `${label[0]}: ${value[0]} , ${label[1]}: ${value[1]}`;
            }
        }else if(children.type.displayName=='acRangepicker'){//日期区间
            let format = children.props.format;
            if(value.length>0){
                str = `${label}: ${value[0].format(format)} ~ ${value[1].format(format)}`;
            }
        }else if(value){
            str = `${label}: ${value}`;
        }
        return str;
    }

    onMouseEnter=(str)=>{
        let show = this.state.show;
        if(!show){
            if(str){ console.log('out inner enter')
                this.timer&&clearTimeout(this.timer)
                this.timer=setTimeout(()=>{
                    this.setState({
                        show:true
                    },()=>{
                        let top = this.str&&this.str.offsetHeight;
                        if(top&&top>32){
                            this.setState({
                                strTop:`-${top+10}px`
                            })
                        }
                    })
                },1000)
                
            }
        }
    }

    mouseLeave = ()=>{
        this.timer&&clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
            this.setState({
                show:false
            })
        },1000)
    }

    innerMouseEnter=()=>{
        this.timer&&clearTimeout(this.timer);
    }

    inneronMouseLeave=()=>{
        this.timer&&clearTimeout(this.timer)
        this.timer = setTimeout(()=>{
            this.setState({
                show:false
            })
        },2000)
    }

    render(){
        let { required } = this.props;
        let classes = 'nc-search-panel-formitem';
        if(required)classes+=' require';
        let str = this.getStr();
        return (
            <div className={classes} 
            onMouseEnter={()=>{this.onMouseEnter(str)}} 
            onMouseLeave={this.mouseLeave} >
                {
                    this.state.show?<span className='nc-search-panel-formitem-value' 
                                    onMouseEnter={this.innerMouseEnter} 
                                    onMouseLeave={this.inneronMouseLeave} 
                                    style={{'top':this.state.strTop}}>
                                        <span className={`nc-search-panel-formitem-value-text ${this.state.strTop=='-28px'?'':'top'}`} ref={ref=>this.str = ref}>{str}</span>
                                    </span>:''
                }
                {
                    required?<span className='nc-search-panel-formitem-mast'>*</span>:''
                }
                { this.getChild() }
            </div>
        )

    }
};

FormItem.propTypes = propTypes;
FormItem.defaultProps = defaultProps;
export default FormItem;