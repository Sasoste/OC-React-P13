import { TransactionSectionProps } from "@/types/types"
import Button from "@components/Button/Button"
import './TransactionSection.scss'

const TransactionSection: React.FC<TransactionSectionProps> = ({ title, amount, description }) => {
    return (
        <section className="account">
            <div className="account-content-wrapper">
                <h3 className="account-title">{title}</h3>
                <p className="account-am&ount">{amount}</p>
                <p className="account-amount-description">{description}</p>
            </div>
            <div className="account-content-wrapper cta">
                <Button className="transaction-button" text="View transactions" />
            </div>
        </section>
    )
}

export default TransactionSection