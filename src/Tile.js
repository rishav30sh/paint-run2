import React, { Component } from 'react'; 
import Avatar from './Avatar.js';
import Monster from './Monster.js';

class Tile extends Component {	
	constructor(props) {
		super(props);
		this.tile = React.createRef();
		this.state = {
			touched: false
		};
	}
	
	hasAvatar(){
		var children = this.tile.current.childNodes;
		for (let child of children) {
			var avatar = child.querySelector('.avatar');
			
			if (avatar) {
				return true;
			}
		}
	}
	
	hasMonster(){
		var children = this.tile.current.childNodes;
		for (let child of children) {
			var monster = child.querySelector('.monster');
			
			if (monster) {
				return true;
			} else {
				return false;
			}
		}
	}

	getAvatar(){
		if (this.props.tile.target) {
			return (
				<Avatar 
					x={this.props.tile.x} 
					y={this.props.tile.y} 
					tile={this}
					/>
			)
		}
	}
	
	renderMonster(key, mon){
		return (
			<Monster key={key} mon={mon} x={mon.mtargetx} y={mon.mtargety} prevDir={mon.prevDir}/>
		);
	}
	
	getMonster(){
		var monsters = [];
		if (this.props.monster) {
			var i = 0;

			for (let mon of this.props.rm){
				monsters.push(this.renderMonster(i, mon))
				i++;
			}
			
			return monsters;
		}
	}
	
	render() {
		const tile = this.props.tile;
		
		const loc = tile.x + '-' + tile.y;
		const target = this.props.target ? 'target' : '';
		const monsterTarget = this.props.monsterTarget ? 'targetM' : ''
		const touchedA = tile.touchedA ? 'touchedA' : '';
		const touchedM = tile.touchedM ? 'touchedM' : '';
		const type = tile.type;
		const avatar = this.getAvatar();
		const monster = this.getMonster();
		
		const classes = `loc ${type} 
							${target}
							${monsterTarget}
							${touchedA} 
							${touchedM} 
							${avatar ? 'avatarT' : ''}
							${monster ? 'monsterT' : ''}`;
		
		return (
			<div className={classes} data-type={type} data-loc={loc} data-x={tile.x} data-y={tile.y} ref={this.tile}>
				{avatar}
				{monster}
			</div>
		)
	}
}

export default Tile;
