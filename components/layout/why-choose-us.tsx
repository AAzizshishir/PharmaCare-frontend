import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const WhyChooseUs = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us</h2>
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
