import React, {Component} from 'react';

import SelectionPages from '../selection-pages';
import styles from './pagination-users.m.less';
import arrowPrev from './arrow-prev.svg';
import arrowNext from './arrow-next.svg';

class PaginationUsers extends Component {
	state = {
		range: 3, //quantity of visible main buttons
		arrCountVisBtns: [],
		btnsMain: null,
		flagBtnEllipsis: false,
		disabledPrev: false,
		disabledNext: false
	} 

	defineAbledBtnArrow = (activeIdx, totalPaginBtns) => {
		if (activeIdx === 0) {
			this.setState({disabledPrev: true});
		} else {
			this.setState({disabledPrev: false});
		}
		if ((activeIdx + 1) === totalPaginBtns) {
			this.setState({disabledNext: true});
		} else {
			this.setState({disabledNext: false});
		}
		if (totalPaginBtns === 1) {
			this.setState({disabledNext: true});
		}
	}

	createArrCountVisBtns = (totalPaginBtns, start, range) => {
		if (totalPaginBtns) {
			for (let i = start, arr = []; i <= totalPaginBtns && arr.length < range; i++) {
				arr = [...arr, i];
				this.setState({arrCountVisBtns:  arr});
			}
		}
		if (!totalPaginBtns) {
			this.setState({arrCountVisBtns: []});
		}
	}

	createBtnsMain = (arrCountVisBtns, activeIdx, onBtnPagin) => {
		const btns = arrCountVisBtns.map(item => {
			const classBtnMain = activeIdx === item - 1 ? 'activeBtnMain' : 'btnMain';
			
			return(
				<li key={item} className={styles.itemBtnMain}>
					<button type="button" className={styles[classBtnMain]}
								onClick={() => onBtnPagin(item - 1)}>
						{item}
					</button>
				</li>	
			);
		});
		this.setState({btnsMain: btns});
	}

	componentDidMount() {
		const {activeIdx, start, onBtnPagin, totalPaginBtns} = this.props;
		const {range, arrCountVisBtns} = this.state;

		this.defineAbledBtnArrow(this.props.activeIdx, this.props.totalPaginBtns);
		this.createArrCountVisBtns(totalPaginBtns, start, range);
		this.createBtnsMain(arrCountVisBtns, activeIdx, onBtnPagin);
	}

	componentDidUpdate(prevProps, prevState) {
		const {activeIdx, start, onBtnPagin, totalPaginBtns} = this.props;
		const {range, arrCountVisBtns} = this.state;

		if (prevProps.totalPaginBtns !== totalPaginBtns || prevProps.start !== start) {
			this.createArrCountVisBtns(totalPaginBtns, start, range);
		}

		if (prevState.arrCountVisBtns !== arrCountVisBtns || prevProps.activeIdx !== activeIdx) {
			this.createBtnsMain(arrCountVisBtns, activeIdx, onBtnPagin);
		}

		if (prevProps.activeIdx !== activeIdx || prevProps.totalPaginBtns !== totalPaginBtns) {
			this.defineAbledBtnArrow(this.props.activeIdx, this.props.totalPaginBtns);
		}
	}

	onClickArrow = (direct) => {
		const {range} = this.state;
		const { activeIdx, onBtnArrow, start, totalPaginBtns} = this.props;
		if (direct === 'prev') {
			if (activeIdx - 1 >= 0) {
				onBtnArrow({activeIdxShift: -1});
				if (start >= activeIdx + 1) {
					onBtnArrow({startShift: -1});
				}
			}
		}

		if (direct === 'next') {
			if (activeIdx + 1 < (totalPaginBtns - 1)) {
				onBtnArrow({activeIdxShift: 1});

				if ((range + start) <= (activeIdx + 2)) {
					onBtnArrow({startShift: 1});
				}
			} 

			if (activeIdx + 2 === totalPaginBtns) {
				onBtnArrow({activeIdxShift: 1});
			}
		}
	}

	render() {
		const {totalPaginBtns, activeIdx, start, onLastBtn, selectChanged, curPage} = this.props;
		const {btnsMain, disabledPrev, disabledNext, range} = this.state;
		const classLastBtn = activeIdx === (totalPaginBtns-1) ? 'activeBtnMain' : 'btnMain';
		const payloadLastBtn = {active:totalPaginBtns - 1, start: totalPaginBtns-range};
		const	contentBtnArrowPrev = totalPaginBtns ? (
					<div className={styles.itemBtnArrow}>
						<button type="button" className={styles.btnArrowPrev}
									onClick={() => this.onClickArrow('prev')}
									disabled={disabledPrev}>
							<p className={styles.svgBoxPrev}>
								<svg width="100%" height="100%">
									<use href={`${arrowPrev}#arrowPrev`}></use>
								</svg>
							</p>
						</button>
					</div>) : null;
		const contentBtnArrowNext = totalPaginBtns ? (
					<div className={styles.itemBtnArrow}>
						<button type="button" className={styles.btnArrowNext}
									onClick={() => this.onClickArrow('next')}
									disabled={disabledNext}>
							<p className={styles.svgBoxNext}>
								<svg width="100%" height="100%">
									<use href={`${arrowNext}#arrowNext`}></use>
								</svg>
							</p>
						</button>
					</div>) : null;
		const lastBtn = totalPaginBtns > range ? (
					<li key={totalPaginBtns} className={styles.itemBtnMain}>
						<button type="button" className={styles[classLastBtn]}
									onClick={() => onLastBtn(payloadLastBtn)}>
							{totalPaginBtns}
						</button>
					</li>	
				) : null;
		const btnEllipsis = (start + range) < totalPaginBtns ? (
					<li key='ellips' className={styles.itemBtnMain}>
						<button type="button" className={styles.btnEllipsis}>
							...
						</button>
					</li>	
				) : null;

		const contentSelectionPages = totalPaginBtns ? (
					<SelectionPages total = {totalPaginBtns} range={range} start={start}
						selectChanged={selectChanged} curPage={curPage} />
				) : null;

		return (
			<div className={styles.wrapperPagination}>
				<div className={styles.boxPagination}>
					{contentBtnArrowPrev}
					<ul className={styles.pagination}>
						{btnsMain}
						{btnEllipsis}
						{lastBtn}
					</ul>
					{contentBtnArrowNext}
				</div>
				{contentSelectionPages}
			</div>
		);
	}
}

export default PaginationUsers;