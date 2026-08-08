import { Info, MoreVertical, ChevronDown } from 'lucide-react';
import './TaxLiabilities.css';

const TAX_BREAKDOWN = [
  { label: 'Value Added Tax', value: 44, color: 'var(--color-chart-vat)' },
  { label: 'Employee Income Tax', value: 36, color: 'var(--color-chart-employee)' },
  { label: 'Tax on Services', value: 20, color: 'var(--color-chart-services)' },
];

const TAX_TABLE = [
  { type: 'Tax on Service', date: 'Oct 18, 2024', amount: '$250.000', status: 'Success' },
];

export default function TaxLiabilities() {
  return (
    <article className="tax-card" aria-label="Tax Liabilities">
      <div className="tax-card__header">
        <div className="tax-card__title-group">
          <h2 className="tax-card__title">Tax Liabilities</h2>
          <Info className="tax-card__info" size={14} />
        </div>
        <div className="tax-card__controls">
          <button className="tax-card__period-btn" type="button">
            Yearly
            <ChevronDown size={12} />
          </button>
          <button className="tax-card__menu-btn" type="button" aria-label="More options">
            <MoreVertical size={16} />
          </button>
        </div>
      </div>

      <div className="tax-card__body">
        <div className="tax-card__total">
          <span className="tax-card__total-value">$32.872,00</span>
          <span className="tax-card__total-label">Total Tax /2024</span>
        </div>

        <div className="tax-card__stacked-bar" role="img" aria-label="Tax breakdown: VAT 44%, Employee 36%, Services 20%">
          {TAX_BREAKDOWN.map((item) => (
            <div
              key={item.label}
              className="tax-card__stacked-segment"
              style={{ inlineSize: `${item.value}%`, backgroundColor: item.color }}
              title={`${item.label}: ${item.value}%`}
            />
          ))}
        </div>

        <div className="tax-card__legend">
          {TAX_BREAKDOWN.map((item) => (
            <span key={item.label} className="tax-card__legend-item">
              <span className="tax-card__legend-dot" style={{ backgroundColor: item.color }}></span>
              {item.label}
              <span className="tax-card__legend-value">{item.value}%</span>
            </span>
          ))}
        </div>

        <div className="tax-card__table-wrapper">
          <table className="tax-card__table">
            <thead>
              <tr>
                <th scope="col">TAX LIABILITIES TYPE</th>
                <th scope="col">DATE</th>
                <th scope="col">AMOUNT</th>
                <th scope="col">STATUS</th>
              </tr>
            </thead>
            <tbody>
              {TAX_TABLE.map((row) => (
                <tr key={row.type}>
                  <td>{row.type}</td>
                  <td>{row.date}</td>
                  <td>{row.amount}</td>
                  <td>
                    <span className="tax-card__status tax-card__status--success">{row.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </article>
  );
}