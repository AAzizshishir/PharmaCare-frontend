import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const WhyChooseUs = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-6 mb-4">
        <h1 className="text-2xl font-bold text-blue-600 text-left mb-3 uppercase">
          Why Choose Us
        </h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Authentic Medicines</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                We source only verified and genuine medicines to ensure your
                safety and trust.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fast Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Get your orders delivered quickly and reliably, right to your
                doorstep.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Secure Payments</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Enjoy safe and hassle-free transactions</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>24/7 Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                Our team is always available to assist you with any questions or
                concerns.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
