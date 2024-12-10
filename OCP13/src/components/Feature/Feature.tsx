import { FeatureProps } from '@types1/types';
import './Feature.scss';

const Feature: React.FC<FeatureProps> = ({ img, title, text }) => {
    return (
        <div className='feature-item'>
            <img src={img} alt={title} className="feature-icon" />
            <h3 className="feature-item-title">{title}</h3>
            <p>{text}</p>
        </div>
    )
}

export default Feature;