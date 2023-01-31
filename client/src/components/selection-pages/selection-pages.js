import React, {Component} from 'react';

import SelectItems from '../select-items';
import styles from './selection-pages.m.less';

class SelectionPages extends Component {
	state = {
		dataOptions: null
	}

	defineDataOptions = () => {
		const {total} = this.props;
		for (let i = 1, dataOptions=[]; i <= total; i++) {
			dataOptions = [...dataOptions, {value: i, label: i}];
			this.setState({dataOptions});
		}
	}

	componentDidMount() {
		this.defineDataOptions();
	}

	componentDidUpdate(prevProps) {
		if (prevProps.total !== this.props.total) {
			this.defineDataOptions();
		}
	}

	selectPage = (opt, name) => {
		const {selectChanged, start, range, total} = this.props;
		const activePage = opt.value - 1;
		let newStart = start; 
		if ((start -1) > activePage) {
			newStart = activePage + 1;
		}
		if ((start-2 + range) < activePage) {
			newStart = activePage - range + 2;
		}
		if ((activePage + 1 === total) && (range < total)) {
			newStart = total - range;
		}

		selectChanged(opt, name, newStart);
	}

	render() {
		const {dataOptions} = this.state;
		const {selectChanged, curPage} = this.props;
		let value = typeof curPage === 'object' ? curPage : {value: curPage, label: curPage};
		return (
			<div className={styles.boxSelectionPages}>
				<p className={styles.selectionText}>
					на странице:
				</p>
				<SelectItems  name='selectPages' value={value} 
						dataOptions={dataOptions} onChangeSelect={this.selectPage} 
						height={124} />
			</div>
		);
	}
}

export default SelectionPages;