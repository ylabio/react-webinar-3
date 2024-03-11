import {memo, useState,useEffect, useMemo} from "react";
import PropTypes, { number } from "prop-types";
import {cn as bem} from '@bem-react/classname';
import './style.css';
import useStore from "../../store/use-store";
import useSelector from "../../store/use-selector";


function Pagination({}) {
    const [currentButton, setCurrentButton] = useState(1);
    const [arrOfCurrButtons, setArrOfCurrButtons] = useState([]);

    const store = useStore();

    const select = useSelector(state => ({
        list: state.catalog.list,
      }));
    
    useMemo(() => {
        store.actions.catalog.load(currentButton);
    }, [currentButton])


    let pageNumbers = [];
    for (let i = 1; i <= 25; i++){
        pageNumbers.push(i);
    }

    useEffect(() => {
        let tempNumberOfPages = [...arrOfCurrButtons];

        let dotsInitial = '...';
        let dotsRight = '... ';
        let dotsLeft = ' ...';

        if (currentButton >= 1 && currentButton <= 3 ){
            tempNumberOfPages = [1,2,3,4, dotsInitial,pageNumbers.length]
        }
        else if(currentButton == 4){
            const sliced = pageNumbers.slice(0,5);
            tempNumberOfPages = [...sliced, dotsInitial, pageNumbers.length]
        }
        else if (currentButton > 4 && currentButton < pageNumbers.length - 2){
            const sliced1 = pageNumbers.slice(currentButton - 2, currentButton);
            const sliced2 = pageNumbers.slice(currentButton, currentButton + 1);
            tempNumberOfPages = ([1, dotsLeft, ...sliced1, ...sliced2, dotsRight, pageNumbers.length])
        }
        else if (currentButton > pageNumbers.length - 3 ){
            const sliced = pageNumbers.slice(pageNumbers.length - 4)
            tempNumberOfPages = ([1, dotsLeft, ...sliced])
        }

        else if (currentButton === dotsInitial){
            setCurrentButton(arrOfCurrButtons[arrOfCurrButtons.length - 3] + 1);
        }

        else if (currentButton === dotsRight){
            setCurrentButton(arrOfCurrButtons[3] + 2);
        }
        else if (currentButton === dotsLeft){
            setCurrentButton(arrOfCurrButtons[3] - 2);
        }

        setArrOfCurrButtons(tempNumberOfPages);
    }, [currentButton])
   
    return (
        <div className="pagination">
            <ul className="pagination__btns">
                {
                    arrOfCurrButtons.map((number,index) =>
                        <li onClick={() => setCurrentButton(number)} className={"pagination-btn " + (currentButton == number ? 'pagination-btn--active' : '')} key = {index}>
                            {/* <a href="!#" className="btn-link"> */}
                                {number}
                            {/* </a> */}
                        </li>
                    )
                }
            </ul>
        </div>
    );
}



export default memo(Pagination);