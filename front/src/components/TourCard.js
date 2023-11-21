import { Col } from "react-bootstrap";

export const TourCard = ({ title, description, imgUrl }) => {
  return (
    <Col size={12} sm={6} md={4}>
      <div className="to-imgbx">
        <img src={imgUrl} />
        <div className="to-txtx">
          <h4>{title}</h4>
          <span>{description}</span>
        </div>
      </div>
    </Col>
  )
}