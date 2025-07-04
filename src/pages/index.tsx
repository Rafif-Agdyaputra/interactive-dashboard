import Card from "../../component/card/CardBasic";
import CartAnalyticsCharts from "../../component/chart/CartAnalyticsCharts";
import LikesLineChart from "../../component/chart/LikesLineChart";
import ProductCategoryChart from "../../component/chart/ProductCategoryChart";
import ReactionPieChart from "../../component/chart/ReactionPieChart";
import RecipeCuisineChart from "../../component/chart/RecipeCuisineChart";
import TagAnalysisChart from "../../component/chart/TagAnalysisChart";
import TopRatedProductsChart from "../../component/chart/TopRatedProducsChart";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f1f5f9] py-10 px-4">
      <div className="max-w-7xl mx-auto space-y-14">
        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            📊 Post Analytics
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <Card>
              <TagAnalysisChart />
            </Card>
            <Card>
              <ReactionPieChart />
            </Card>
            <Card>
              <LikesLineChart />
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            👨‍🍳 Recipes Analytics
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <RecipeCuisineChart />
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            🛒 Product Analytics
          </h2>
          <div className="grid grid-cols-2 gap-6">
            <Card>
              <ProductCategoryChart />
            </Card>
            <Card>
              <TopRatedProductsChart />
            </Card>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">
            🛍️ Cart Analytics
          </h2>
          <div className="grid grid-cols-1 gap-6">
            <Card>
              <CartAnalyticsCharts />
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
}
