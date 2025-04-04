import React, { useState, useEffect, useContext } from 'react';
import Catalog from '../../store/catalog';
import Pagination from '../pagination';
import CustomSelect from '../custom-select';
import LanguageContext from '../language-provider';

function PaginationController({ store }) {

  const { language, translations } = useContext(LanguageContext);
  
  const [catalogModule] = useState(() => new Catalog(store, 'catalog'));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  
  const [refresh, setRefresh] = useState(0);

  const options = [
    { value: 5, label: '5' },
    { value: 10, label: '10' },
    { value: 20, label: '20' },
  ];

  useEffect(() => {
    async function loadData() {
      const skip = (currentPage - 1) * itemsPerPage;
      await catalogModule.load({ limit: itemsPerPage, skip });
      setRefresh(r => r + 1);
    }
    loadData();
  }, [currentPage, itemsPerPage, catalogModule]);

  const { count } = catalogModule.getState();
  const totalPages = Math.ceil(count / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  return (
    <div className="pagination">
      <div className="select-qty">
        <h4>{translations[language].selectQty}</h4>
        <CustomSelect
          options={options}
          value={itemsPerPage}
          onChange={(val) => setItemsPerPage(val, setCurrentPage(1))}
          placeholder="Выберите число"
        />
      </div>
      <div className="pagination-buttons">
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
}

export default PaginationController;
