import { Link } from "react-router-dom";
/**
 * CompanyCard
 *
 * props:
 *  - company {name, handle, description,logoUrl};
 *
 * App => RoutesList => CompaniesList => CompanyCard
 */

function CompanyCard({ handle, name, description, logoUrl }) {


  return (
    <Link to={`/companies/${handle}`} className="CompanyCard">
      <div >
        <h2>{name}</h2>
        <p>{description}</p>
        {logoUrl && <img src={logoUrl} alt={name}></img>}

      </div>
    </Link>
  );
}

export default CompanyCard;