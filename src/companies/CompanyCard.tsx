import { Link } from "react-router-dom";
import { Company } from "../interfaces";
/**
 * CompanyCard
 *
 * props:
 *  - company {name, handle, description,logoUrl};
 *
 * App => RoutesList => CompaniesList => CompanyCard
 */

function CompanyCard({ handle, name, description, logoUrl }: Company) {


  return (

     <div className="card md:card-side bg-base-100 shadow-xl px-4 pt-4">
  <figure><img className="w-[200px]  rounded-lg" src={logoUrl ? logoUrl : "/logos/logo3.png"} alt="Movie"/></figure>
  <div className="card-body">
    <h2 className="card-title">{name}</h2>
    <p>{description}</p>
    <div className="card-actions justify-end">
    <Link to={`/companies/${handle}`}>
      <button className="btn btn-secondary btn-circle">Go</button>
      </Link>
    </div>
  </div>
</div>

  );
}

export default CompanyCard;